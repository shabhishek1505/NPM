import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserActionTypes, UserActions } from "./user.action";

export interface UserState{
  maskUserName:boolean
}

const initailState:UserState={
  maskUserName:true
}

const getUserFeatureState=createFeatureSelector<UserState>('users');

export const getMaskUserName=createSelector(getUserFeatureState,State=>State.maskUserName);

export function reducer(state=initailState, action:UserActions) {
  switch (action.type) {

    case UserActionTypes.MaskUserName:
      return {
        ...state,
        maskUserName: action.payload
      };

    default:
      return state;
  }
}
