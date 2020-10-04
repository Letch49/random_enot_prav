import os

import resolver
from resolver import spacy_trainer
from resolver.animals import create_data_classifier, train_data_classifier, save_data_classifier


class ClassifyHolder:

    __classifier = None

    @classmethod
    def __generate_classifier(cls):
        ru_path = os.path.join(os.path.dirname(resolver.__file__), 'spacy-ru-master', 'ru2')
        cls.__classifier = create_data_classifier(
            "ANIMALS",
            spacy_ru_path=ru_path
        )

        if not cls.__classifier.was_loaded:
            train_path = os.path.join(os.path.dirname(resolver.__file__), 'train_set.json')
            with open(train_path, 'r', encoding='utf-8') as f:
                train_data = spacy_trainer.build_ner_train_data(f.read())
            print("Training classifier...")
            cls.__classifier = train_data_classifier(cls.__classifier, train_data, 17)
            print("Saving classifier...")
            save_data_classifier(cls.__classifier, "ANIMALS")

    @classmethod
    def get_classifier(cls):
        if cls.__classifier is None:
            cls.__generate_classifier()
        return cls.__classifier
