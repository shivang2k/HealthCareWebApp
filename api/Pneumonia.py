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

class Pneumonia(Resource):

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Api Handler"
        }

    def post(self):
        target = os.path.join("", 'test_docs/pneumonia')
        if not os.path.isdir(target):
            os.mkdir(target)
        print("welcome to upload")
        print(request)
        file = request.files['file']
        print(file)

        saved_path = 'api\pneumonia_model\content\pneumonia_model'
        model = tf.keras.models.load_model(saved_path)
        print(model.summary())


        filename = secure_filename(file.filename)
        destination = "/".join([target, filename])
        file.save(destination)
        session['uploadFilePath'] = destination

        img_arr = cv2.imread(destination, cv2.IMREAD_GRAYSCALE)
        resized_arr = cv2.resize(img_arr, (150, 150))

        image = np.asarray(resized_arr).astype(np.float32)
        tensor_image = tf.convert_to_tensor(image, dtype=tf.float32)

        #tensor_image = tf.image.resize(tensor_image, (150,150))
        tensor_image = tf.cast(tensor_image, tf.float32) / 255.0
        shape = tensor_image.shape
        print(shape)
        tensor_image = tf.reshape(tensor_image, [-1, 150, 150, 1])

        res = model.predict(tensor_image)
        print(res)
        if(res < 0.5):
            res = 1 - res
            return f"Infected, confidence: {res[0][0]*100} %"
        else:
            return f"Uninfected, confidence: {res[0][0]*100} %"
        

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
