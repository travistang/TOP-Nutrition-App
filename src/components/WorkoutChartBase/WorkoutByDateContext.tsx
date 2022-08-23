import React from 'react';
import { ExerciseSetRecord } from '../../database/ExerciseDatabase';

type WorkoutByDateContextProps = Record<string, ExerciseSetRecord[]>;

export const workoutByDateContext = React.createContext<WorkoutByDateContextProps>({});

type ProviderProps = {
    children: React.ReactNode;
    workoutByDates: WorkoutByDateContextProps;
};
export default function WorkoutByDateContextProvider({ children, workoutByDates }: ProviderProps) {
    return (
        <workoutByDateContext.Provider value={workoutByDates}>
            {children}
        </workoutByDateContext.Provider>
    );
};