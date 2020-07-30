// import { StravaActivitiesByTrainValues } from '../models/strava.request.model';
// import { TrainingState } from '../training.reducer';
//
// export const compareAndReturnRenewData = (state: TrainingState, action: { data: StravaActivitiesByTrainValues[] }) => {
//   if (!state.activitiesByTrainValues.data) {
//     return action.data
//   }
//   return action.data.map((newEl) => {
//     const oldEl = state.activitiesByTrainValues.data.find((oldEl) => {
//       return JSON.stringify(newEl) === JSON.stringify(oldEl)
//     })
//     return !oldEl ? newEl : oldEl
//   })
// }
import { StravaActivitiesByTrainValues } from '../models/strava.request.model';
import { TrainingState } from '../training.reducer';

export const compareAndReturnRenewData = (oldArr: any[], newArr: any[]) => {
  if (!oldArr) {
    return newArr
  }
  return newArr.map((newEl) => {
    const oldEl = oldArr.find((oldEl) => {
      return JSON.stringify(newEl) === JSON.stringify(oldEl)
    })
    return !oldEl ? newEl : oldEl
  })
}

