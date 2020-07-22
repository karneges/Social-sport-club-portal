import { TrainingTypes } from './strava.request.model';

export const filterMap: { [key in TrainingTypes]: string } = {
  elapsed_time: 'Elapsed Time',
  moving_time: 'Moving Time',
  distance: 'Distance',
  total_elevation_gain: 'Total Elevation Gain',
  athlete_count: 'Athlete Count',
  average_speed: 'Average Speed',
  max_speed: 'Max Speed',
  average_watts: 'Average Watts',
  kilojoules: 'Kilojoules',
}
