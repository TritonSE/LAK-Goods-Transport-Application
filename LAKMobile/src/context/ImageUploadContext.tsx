/**
 * This context stores the images uploaded through components/ImageUploadArea.tsx.
 * By using this context along with ImageUploadArea, forms can access and submit the
 * images uploaded by the user to our backend.
 */
import React, { createContext, Reducer, useReducer, useState } from 'react';
import { imageIdToSource } from "../api";
import * as ImagePicker from 'expo-image-picker';

const MAX_IMAGES = 3;

type ImagesReducerState = string[];

interface ImagesReducerAddAction {
  type: 'ADD_IMAGE';
  payload: ImagePicker.ImagePickerAsset;
}

interface ImagesReducerRemoveAction {
  type: 'REMOVE_IMAGE';
  payload: number;
}

interface ImagesReducerSetAction {
  type: 'SET_IMAGES';
  payload: string[];
}

interface ImagesReducerClearAction {
  type: 'CLEAR_IMAGES';
}

type ImagesReducerAction =
  | ImagesReducerAddAction
  | ImagesReducerRemoveAction
  | ImagesReducerSetAction
  | ImagesReducerClearAction;

type ImagesReducer = Reducer<ImagesReducerState, ImagesReducerAction>;

export type ImageUploadState = {
  dispatch: React.Dispatch<ImagesReducerAction>;
  imageURIs: ImagesReducerState;
  imageInfo: Array<ImagePicker.ImagePickerAsset | null>;
  validateImageUpload: () => boolean;
};

const init: ImageUploadState = {
  dispatch: () => undefined,
  imageURIs: new Array(MAX_IMAGES).fill(''),
  imageInfo: new Array(MAX_IMAGES).fill(null),
  validateImageUpload: () => false,
};

export const ImageUploadContext = createContext<ImageUploadState>(init);

interface Props {
  children: React.ReactNode;
}

export const ImageUploadProvider: React.FC<Props> = ({ children }) => {
  const reducer: ImagesReducer = (state, action): ImagesReducerState => {
    let newState = state.slice();
    switch (action.type) {
      case 'ADD_IMAGE':
        const index = newState.findIndex((value) => value === '');
        newState[index] = action.payload.uri;
        if (imageInfo) {
          const newImageInfo = imageInfo.map((im, i) => {
            return i === index ? action.payload : im;
          });
          setImageInfo(newImageInfo);
        }
        break;
      case 'REMOVE_IMAGE':
        newState[action.payload] = '';
        newState = newState.filter((value) => value !== '');
        while (newState.length < 3) {
          newState.push('');
        }
        break;
      case 'SET_IMAGES':
        // This should take a list of preexisting images on the backend and add them to the state.
        // Note: We might be able to store the imageIDs under the imageURIs.
        // Then, under the backend, we need to check if the imageIDs already exist and not delete them if so.
        newState = action.payload.map((imageId) => imageIdToSource(imageId).uri)
        while (newState.length < 3) {
          newState.push('');
        }
        break;
      case 'CLEAR_IMAGES':
        newState = new Array(MAX_IMAGES).fill('');
        setImageInfo(new Array(MAX_IMAGES).fill(null));
        break;
    }
    return newState;
  };
  const [imageInfo, setImageInfo] = useState<Array<ImagePicker.ImagePickerAsset | null>>(
    new Array(MAX_IMAGES).fill(null)
  );
  const [imageURIs, dispatch] = useReducer(reducer, new Array(MAX_IMAGES).fill(''));

  // This function checks if at least 1 image has been added to the upload area.
  const validateImageUpload = (): boolean => {
    return imageURIs.findIndex((value) => value !== '') !== -1;
  };

  return (
    <ImageUploadContext.Provider value={{ dispatch, imageURIs, imageInfo, validateImageUpload }}>
      {children}
    </ImageUploadContext.Provider>
  );
};
