/**
 * interface para respuestas en general.
 */
export interface Responses {
    ok: boolean,
    error: Error | null | undefined,
    msg: string,
    data: [] | {} | undefined
}