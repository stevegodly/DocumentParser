import easyocr
import cv2
import re
import numpy as np

reader = easyocr.Reader(['en','hi'])

def extract_english_text(mixed_text):
    english_pattern = r'[A-Za-z0-9\s.,!?/-]+'

    english_text_list = re.findall(english_pattern, mixed_text)

    english_text = ' '.join(english_text_list)

    return english_text

def extract_text(path):
    img=cv2.imread(path)
    print("fininshed ocr download")
    result = reader.readtext(img, paragraph=True)
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
    img=cv2.imread(path)
    print("fininshed ocr download")
    result = reader.readtext(img)
    print("finished reading")
    text=''
    for item in result:
        text += extract_english_pan(item[1])+ ' '
    text=" ".join(text.split())
    print("text:",text)
    return text