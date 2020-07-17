import * as moment from 'moment'

export class StravaRequestModel {
  // private topBarerDate: string
  // private bottomBarerDate: string
  // private fields: TrainingTypes []

  constructor(
   private topBarerDate: string,
   private bottomBarerDate: string,
   private fields: TrainingTypes[]
  ) {
    // this.topBarerDate = topBarerDate.format()
    // this.bottomBarerDate = bottomBarerDate.format()
    // this.fields = Object.keys(fields).map((el: TrainingTypes) => el)
  }
}

export interface StravaResponseModel<T extends Partial<TrainingPropsObject> = Partial<TrainingPropsObject>> {
  success: boolean
  activities: StravaActivities[]
}

export type Train = 'Run' | 'Ride' | 'NordicSki'
export type TrainingTypes = 'elapsed_time'
  | 'distance'
  | 'moving_time'
  | 'total_elevation_gain'
  | 'athlete_count'
  | 'average_speed'
  | 'max_speed'
  | 'average_watts'
  | 'kilojoules'

export type TrainingPropsObject = { [key in TrainingTypes]: boolean }

export type StravaActivities<T = Partial<TrainingPropsObject>> = {
  [key in keyof T]: {
    min: number,
    max: number,
    sum: number,
    avg: number
  }
} & { _id: Train }


