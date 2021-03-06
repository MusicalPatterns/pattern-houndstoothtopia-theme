import { as, Cycle, Frequency, rotate, Scalar, Space, Thunk, TwoDimensional, use } from '@musical-patterns/utilities'
import {
    EIGHTH_TURN_COUNTERCLOCKWISE,
    NO_TURN_COUNTERCLOCKWISE,
    PERIMETER_PITCH_SPATIAL_SHIFT,
    QUARTER_TURN_COUNTERCLOCKWISE,
    THREE_EIGHTHS_TURN_COUNTERCLOCKWISE,
} from '../constants'
import {
    thunkHoundstoothCoordinatesSpecializedForHoundstoothtopiaTheme,
    thunkHoundstoothSolidCenterOriginCoordinate,
} from '../coordinates'
import { PlanarCoordinate } from '../types'
import { TRANSLATION_TO_START_ON_ROOT_TIP_BEFORE_ROOT_BASE } from './constants'
import { PerimeterPitches } from './types'

const pitchesFromHeights: (coordinates: PlanarCoordinate[]) => Array<Scalar<Frequency>> =
    (coordinates: PlanarCoordinate[]): Array<Scalar<Frequency>> =>
        coordinates.map((coordinate: PlanarCoordinate): Scalar<Frequency> => {
            const height: Space = coordinate[ 1 ]

            return as.Scalar<Frequency>(as.number(use.Cardinal(height, PERIMETER_PITCH_SPATIAL_SHIFT)))
        })

const thunkPerimeterPitches: Thunk<PerimeterPitches> =
    (): PerimeterPitches => {
        const houndstoothCoordinates: Cycle<PlanarCoordinate> =
            thunkHoundstoothCoordinatesSpecializedForHoundstoothtopiaTheme()
        const cycledHoundstoothCoordinates: Cycle<PlanarCoordinate> = use.Cardinal(
            houndstoothCoordinates,
            TRANSLATION_TO_START_ON_ROOT_TIP_BEFORE_ROOT_BASE,
        )

        const houndstoothCenterCoordinate: PlanarCoordinate =
            thunkHoundstoothSolidCenterOriginCoordinate()
        const houndstoothTopRightGrainCoordinates: PlanarCoordinate[] =
            cycledHoundstoothCoordinates.map((coordinate: PlanarCoordinate): PlanarCoordinate =>
                rotate<Space, TwoDimensional>({
                    coordinate,
                    fixedCoordinate: houndstoothCenterCoordinate,
                    rotation: NO_TURN_COUNTERCLOCKWISE,
                }))
        const houndstoothTopGrainCoordinates: PlanarCoordinate[] =
            cycledHoundstoothCoordinates.map((coordinate: PlanarCoordinate): PlanarCoordinate =>
                rotate<Space, TwoDimensional>({
                    coordinate,
                    fixedCoordinate: houndstoothCenterCoordinate,
                    rotation: EIGHTH_TURN_COUNTERCLOCKWISE,
                }))
        const houndstoothTopLeftGrainCoordinates: PlanarCoordinate[] =
            cycledHoundstoothCoordinates.map((coordinate: PlanarCoordinate): PlanarCoordinate =>
                rotate<Space, TwoDimensional>({
                    coordinate,
                    fixedCoordinate: houndstoothCenterCoordinate,
                    rotation: QUARTER_TURN_COUNTERCLOCKWISE,
                }))
        const houndstoothLeftGrainCoordinates: PlanarCoordinate[] =
            cycledHoundstoothCoordinates.map((coordinate: PlanarCoordinate): PlanarCoordinate =>
                rotate<Space, TwoDimensional>({
                    coordinate,
                    fixedCoordinate: houndstoothCenterCoordinate,
                    rotation: THREE_EIGHTHS_TURN_COUNTERCLOCKWISE,
                }))

        const leftGrain: Array<Scalar<Frequency>> =
            pitchesFromHeights(houndstoothLeftGrainCoordinates)
        const topGrain: Array<Scalar<Frequency>> =
            pitchesFromHeights(houndstoothTopGrainCoordinates)
        const topLeftGrain: Array<Scalar<Frequency>> =
            pitchesFromHeights(houndstoothTopLeftGrainCoordinates)
        const topRightGrain: Array<Scalar<Frequency>> =
            pitchesFromHeights(houndstoothTopRightGrainCoordinates)

        return {
            leftGrain,
            topGrain,
            topLeftGrain,
            topRightGrain,
        }
    }

export {
    thunkPerimeterPitches,
}
