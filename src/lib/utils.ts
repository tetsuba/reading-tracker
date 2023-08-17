import { LoginUserTypes, RegisterBookTypes } from '../api/api-types'
import * as R from 'ramda'

type ValueType = {
    value: string
}

export interface RegistrationFormTypes extends EventTarget {
    firstName?: ValueType
    lastName?: ValueType
    email?: ValueType
    password?: ValueType
}

export function formDataToQueryString(target: RegistrationFormTypes): string {
    const formData: { [key: string]: string } = {
        firstName: target.firstName ? target.firstName.value : '',
        lastName: target.lastName ? target.lastName.value : '',
        email: target.email ? target.email.value : '',
        password: target.password ? target.password.value : ''
    }

    return Object.keys(formData)
        .map((key) => `${key}=${formData[key]}`)
        .join('&')
}

interface LoginFormTypes extends EventTarget {
    email?: ValueType
    password?: ValueType
}
export function formDataToObject(target: LoginFormTypes): LoginUserTypes {
    return {
        username: target.email?.value,
        password: target.password?.value
    }
}

interface LoginErrorMessageTypes extends Error {
    response?: {
        data: {
            error: string
        }
    }
}

export function getErrorMessage(error: LoginErrorMessageTypes): string {
    if (
        error &&
        error.response &&
        error.response.data &&
        error.response.data.error
    ) {
        return error.response.data.error
    }
    return ''
}

export function delay(time: number) {
    return new Promise((resolve) => setTimeout(() => resolve('success'), time))
}

interface StoryFormTypes extends EventTarget {
    title?: ValueType
    story?: ValueType
}
export function mutateRegisterBookData(
    target: StoryFormTypes,
    userId: number
): RegisterBookTypes {
    const story = target.story?.value.split(/\n/).filter((word) => word)
    return {
        userId,
        title: target.title?.value,
        story
    }
}

export function isNull<T>(data: T): boolean {
    return data === null
}

export function isEmpty<T>(data: T | T[] | undefined): boolean {
    if (data === null) {
        return true
    }

    if (data === undefined) {
        return true
    }

    if (Array.isArray(data) && data.length === 0) {
        return true
    }

    return typeof data === 'object' && Object.keys(data).length === 0
}

export type OrUndefined<type> = type | undefined
export function defaultTo<A, B, C extends undefined, D>(
    defaultFunc: () => A,
    func: (a: B) => D
) {
    return function (arg: OrUndefined<B>): A | D {
        return isEmpty(arg) ? defaultFunc() : func(arg as B)
    }
}

export function lastEntry<T>(array: T[]): T {
    return array[array.length - 1]
}

// @ts-ignore
export function debugCompose<T>(arg: T): T {
    console.log('DEBUG: ', arg)
    return arg
}

export function ifElse<IF, F1, F2, T>(
    ifFunction: (a: T) => IF,
    Option1: (a: T) => F1,
    Option2: (a: T) => F2
) {
    return (arg: T): F1 | F2 => {
        return ifFunction(arg) ? Option1(arg) : Option2(arg)
    }
}

export function isArray<T>(data: T): boolean {
    return Array.isArray(data)
}

export const notUndefined = <T>(v: T): boolean => R.not(R.isNil(v))
