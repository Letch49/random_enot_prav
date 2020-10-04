from resolver import spacy_trainer
import spacy


class Classifier:
    nlp = None
    was_loaded = True


def create_data_classifier(name, spacy_ru_path=None, logger=print):
    classifier = Classifier()
    try:
        classifier.nlp = spacy.load(name)
    except:
        classifier.was_loaded = False
        logger("Can't load existing model")
        if spacy_ru_path is not None:
            logger("Creating spacy-ru model")
            classifier.nlp = spacy.load(spacy_ru_path)
        else:
            logger("Creating blank model")
            classifier.nlp = spacy.blank("ru")
    return classifier


def save_data_classifier(classifier, name):
    classifier.nlp.to_disk(name)


def train_data_classifier(classifier, train_data, iterations=10, logger=print):
    classifier.nlp = spacy_trainer.train(train_data, iterations, classifier.nlp, logger)
    return classifier


def classify_text(classifier, text):
    doc = classifier.nlp(text)
    classified_data = []
    for entity in doc.ents:
        classified_data.append([entity.label_, entity.lemma_, entity])
    return classified_data
