import { useSnapshot } from 'valtio'

declare module 'valtio' {
    export function useSnapshot<T>(p: T): T
}
