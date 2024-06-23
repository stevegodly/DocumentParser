from PIL import Image
import cv2
import numpy as np
from transformers import LayoutLMv2ForSequenceClassification,LayoutLMv2FeatureExtractor, LayoutLMv2Tokenizer, LayoutLMv2Processor
import torch
import re
import easyocr


device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

model = LayoutLMv2ForSequenceClassification.from_pretrained("microsoft/layoutlmv2-base-uncased",num_labels=2)
model.to(device)

feature_extractor = LayoutLMv2FeatureExtractor(apply_ocr=False)
tokenizer = LayoutLMv2Tokenizer.from_pretrained("microsoft/layoutlmv2-base-uncased")
processor = LayoutLMv2Processor(feature_extractor, tokenizer)

id2label={0:'Aadhar',1:'Pan'}
def extract_english_text(mixed_text):
    english_pattern = r'[A-Za-z0-9\s.,!?/-]+'

    english_text_list = re.findall(english_pattern, mixed_text)

    english_text = ' '.join(english_text_list)

    return english_text


def normalize_bbox(bbox, width, height):
    return [
        min(999,int(1000 * bbox[0][0] / width)),
        min(999,int(1000 * bbox[0][1] / height)),
        min(999,int(1000 * bbox[2][0] / width)),
        min(999,int(1000 * bbox[2][1] / height))
    ]

def preprocess_image(path):
    image = cv2.imread(path)
    pillow_image = Image.fromarray(image)
    image_width, image_height =pillow_image.size

    reader = easyocr.Reader(['en','hi'])
    result = reader.readtext(image)

    texts = []
    boxes = []
    for (bbox, text, prob) in result:
        english_text=extract_english_text(text)
        if english_text:
            texts.append(english_text)
            normalized_bbox = normalize_bbox(bbox, image_width, image_height)
            boxes.append(normalized_bbox)
    print("bbox : ",boxes)
    return pillow_image, texts, boxes    

def classify_doc(path):
    model.load_state_dict(torch.load('D:/docParser/backend/model.pth'))
    pillow_image, texts, boxes = preprocess_image(path)

    encoded_inputs = processor(pillow_image, texts, boxes=boxes,return_tensors="pt")
    for k,v in encoded_inputs.items():
        encoded_inputs[k] = v.to(model.device)

    # forward pass
    outputs = model(**encoded_inputs)
    logits = outputs.logits
    print(logits.shape)
    predicted_class_idx = logits.argmax(-1).item()
    print(predicted_class_idx)
    return id2label[predicted_class_idx]
