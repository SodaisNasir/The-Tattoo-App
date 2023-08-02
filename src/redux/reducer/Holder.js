export const USER_DETAILS = 'USER_DETAILS'
export const IS_SIGN_IN = 'IS_SIGN_IN'
export const OTP = 'OTP'
export const ROLE_ID = 'ROLE_ID'
export const SOCIAL_DATA = 'SOCIAL_DATA'
export const ALLTATTO = 'ALLTATTO'
export const SKINTONES = 'SKINTONES'
export const ALLCREATORS = 'ALLCREATORS'
export const ALLUSERS = 'ALLUSERS'
export const RANDOMPROFILE = 'RANDOMPROFILE'
export const LIKED_TATTO = 'LIKED_TATTO'

const initial_state = {
  user_details: null,
  is_sign_in: false,
  otp: null,
  role_id: null,
  social_data: null,
  alltatto: [],
  skintones: [],
  allcreators: [],
  allusers: [],
  liked_tatto: [],
  randomprofile: null,
}

const holderReducer = (state = initial_state, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        user_details: action.payload,
      }
    case IS_SIGN_IN:
      return {is_sign_in: action.payload}
      case OTP:
        return {
          ...state,
          otp: action.payload,
        }
      case ROLE_ID:
        return {
          ...state,
          role_id: action.payload,
        }
      case SOCIAL_DATA:
        return {
          ...state,
          social_data: action.payload,
        }
      case ALLTATTO:
        return {
          ...state,
          alltatto: action.payload,
        }
      case SKINTONES:
        return {
          ...state,
          skintones: action.payload,
        }
      case ALLCREATORS:
        return {
          ...state,
          allcreators: action.payload,
        }
      case ALLUSERS:
        return {
          ...state,
          allusers: action.payload,
        }
      case RANDOMPROFILE:
        return {
          ...state,
          randomprofile: action.payload,
        }
      case LIKED_TATTO:
        return {
          ...state,
          liked_tatto: action.payload,
        }
    default: {
      return state
    }
  }
}

export default holderReducer
