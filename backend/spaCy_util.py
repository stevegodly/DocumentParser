import spacy
nlp_ner = spacy.load("D:/DocumentParser/backend/model-best")
def process_text(text):
    print("finished loading spacy")
    doc=nlp_ner(text)
    print("doc:",doc)
    entities={}
    for ent in doc.ents:
        entities[ent.label_]=ent.text
    return entities