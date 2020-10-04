import spacy
import random
import json

def train(train_data, iterations=10, nlp = None, logger = print):
    if nlp is None:
        nlp = spacy.blank('ru')
    # create the built-in pipeline components and add them to the pipeline
    # nlp.create_pipe works for built-ins that are registered with spaCy
    if 'ner' not in nlp.pipe_names:
        ner = nlp.create_pipe('ner')
        nlp.add_pipe(ner, last=True)
    else:
        nlp.remove_pipe('ner')
        ner = nlp.create_pipe('ner')
        nlp.add_pipe(ner, last=True)    

    #return nlp

    # add labels
    for _, annotations in train_data:
         for ent in annotations.get('entities'):
            ner.add_label(ent[2])

    # get names of other pipes to disable them during training
    other_pipes = [pipe for pipe in nlp.pipe_names if pipe != 'ner']
    with nlp.disable_pipes(*other_pipes):  # only train NER
        optimizer = nlp.begin_training()
        for itn in range(iterations):
            logger("Statring iteration " + str(itn))
            random.shuffle(train_data)
            losses = {}
            for text, annotations in train_data:
                nlp.update(
                    [text],  # batch of texts
                    [annotations],  # batch of annotations
                    drop=0.2,  # dropout - make it harder to memorise data
                    sgd=optimizer,  # callable to update weights
                    losses=losses)
            logger(losses)
    
    return nlp

def build_ner_train_data(raw_data, logger = print):
    training_data = []
    for data in json.loads(raw_data):
        text = data['content']
        lower_text = text.lower()
        entities = []
        for annotation in data['annotation']:
            labels = annotation['label']
            # handle both list of labels or a single label.
            if not isinstance(labels, list):
                labels = [labels]

            for label in labels:
                points = annotation['points']
                # handle both list of points or a single point.
                if not isinstance(points, list):
                    points = [points]
                for point in points:
                    start = 0
                    end = 0
                    if point.get('start'):
                        start = point['start']
                        end = point['end']
                    else:
                        subtext = point['text'].lower()
                        start = lower_text.find(subtext, start + 1)
                        while (start != -1):
                            end = start + len(subtext)
                            entities.append([start, end, label])
                            start = lower_text.find(subtext, start + 1)

        training_data.append((text, {"entities" : entities}))

    return training_data