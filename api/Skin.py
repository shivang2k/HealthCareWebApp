from flask_restful import Api, Resource, reqparse
import os
from flask import Flask, flash, request, redirect, url_for, session
from werkzeug.utils import secure_filename
from flask_cors import CORS, cross_origin
import logging
import tensorflow as tf
from keras.layers import Conv2D, Dense, Flatten, Dropout, MaxPool2D,ZeroPadding2D
from tensorflow.keras  import optimizers
from keras import Sequential
from keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import numpy as np
import cv2

ALLOWED_EXTENSIONS = set(['png', 'jpg', 'jpeg'])

class Skin(Resource):

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Api Handler"
        }

    def post(self):
        target = os.path.join("", 'test_docs/skin')
        if not os.path.isdir(target):
            os.mkdir(target)
        print("welcome to upload")
        print(request)
        file = request.files['file']
        print(file)

        saved_path = 'api\skin_model\content\skin_model'
        model = tf.keras.models.load_model(saved_path)
        print(model.summary())


        filename = secure_filename(file.filename)
        destination = "/".join([target, filename])
        file.save(destination)
        session['uploadFilePath'] = destination

        img_arr = cv2.imread(destination, cv2.IMREAD_GRAYSCALE)
        resized_arr = cv2.resize(img_arr, (48,48))

        image = np.asarray(resized_arr).astype(np.float32)
        tensor_image = tf.convert_to_tensor(image, dtype=tf.float32)

        #tensor_image = tf.image.resize(tensor_image, (48, 48))
        tensor_image = tf.cast(tensor_image, tf.float32) / 255.0
        shape = tensor_image.shape
        print(shape)
        tensor_image = tf.reshape(tensor_image,[1, shape[0],shape[1], 1])
        l = ["Acne and Rosacea Photos", "Actinic Keratosis Basal Cell Carcinoma and other Malignant Lesions", "Atopic Dermatitis", "Bullous Disease", "Cellulitis Impetigo", "Eczema", "Exanthems and Drug Eruptions", "Hair Loss", "Herpes HPV and other STDs", "Light Diseases and Disorders of Pigment", "Lupus", "Melanoma Skin Cancer Nevi", "Nail Fungus", "Poison Ivy", "Psoriasis", "Scabies Lyme Disease", "Seborrheic Keratoses", "Systemic Disease", "Tinea Ringworm Candidiasis", "Urticaria Hives", "Vascular Tumors", "Vasculitis", "Warts Molluscum"]

        res = model.predict(tensor_image)
        flat_list = [item for sublist in res for item in sublist]
        print(flat_list)
        max_value = max(flat_list)
        max_index = flat_list.index(max_value)
        return l[max_index]
         

    # parser = reqparse.RequestParser()
    # parser.add_argument('type', type=str)
    # parser.add_argument('message', type=str)

    # args = parser.parse_args()

    # print(args)
    # # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

    # request_type = args['type']
    # request_json = args['message']
    #  # ret_status, ret_msg = ReturnData(request_type, request_json)
    #  # currently just returning the req straight
    #  ret_status = request_type
    #   ret_msg = request_json

    #    if ret_msg:
    #         message = "Your Message Requested: {}".format(ret_msg)
    #     else:
    #         message = "No Msg"

    #     final_ret = {"status": "Success", "message": message}

    #     return final_ret
