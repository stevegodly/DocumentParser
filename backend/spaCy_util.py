import spacy
nlp_ner = spacy.load("D:/DocumentParser/backend/model-best")
nlp_ner_pan=spacy.load("D:/DocumentParser/backend/pan-model-best")
def process_text(text):
    print("finished loading spacy")
    doc=nlp_ner(text)
    print("doc:",doc)
    entities={}
    for ent in doc.ents:
        entities[ent.label_]=ent.text
    return entities

def process_pan(text):
    print("finished loading pan spacy")
    doc=nlp_ner_pan(text)
    print("doc:",doc)
    entities={}
    for ent in doc.ents:
        entities[ent.label_]=ent.text
    print("in pan entities:",entities)    
    return entities