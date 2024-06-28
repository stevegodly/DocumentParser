import easyocr
import cv2
import re
import numpy as np

reader = easyocr.Reader(['en','hi'])

import easyocr
import cv2
import re
import numpy as np
from PIL import Image,ImageEnhance

reader = easyocr.Reader(['en','hi'])

def resize_image(input_image_path):
    with Image.open(input_image_path) as img:
        resized_img = img.resize((1040, 780), Image.ANTIALIAS)
    return resized_img    

def increase_brightness(img):
    enhancer = ImageEnhance.Brightness(img)
    brightened_img = enhancer.enhance(1.5)
    return brightened_img

def extract_english_text(mixed_text):
    english_pattern = r'[A-Za-z0-9\s.,!?/-]+'

    english_text_list = re.findall(english_pattern, mixed_text)

    english_text = ' '.join(english_text_list)

    return english_text

def extract_text(path):
    r_img=resize_image(path)
    img=increase_brightness(r_img)
    print("fininshed ocr download")
    result = reader.readtext(img)
    print("finished reading")
    text=''
    for item in result:
        text += extract_english_text(item[1])+ ' '
    text=" ".join(text.split())
    print("text:",text)
    return text

def extract_english_pan(mixed_text):
    english_pattern = r'[A-Za-z0-9\s.,!?/-]+'

    english_text_list = re.findall(english_pattern, mixed_text)
    english_text_list = [text for text in english_text_list if text.strip() and text != '/']
    print("english_text_list:",english_text_list)
    if(len(english_text_list)==0):
      return ""

    english_text = ''.join(english_text_list)
    english_text=english_text + "|"
    return english_text

def extract_pan(path):
    r_img=resize_image(path)
    img=increase_brightness(r_img)
    print("fininshed ocr download")
    result = reader.readtext(img)
    print("finished reading")
    text=''
    for item in result:
        text += extract_english_pan(item[1])+ ' '
    text=" ".join(text.split())
    print("text:",text)
    return text