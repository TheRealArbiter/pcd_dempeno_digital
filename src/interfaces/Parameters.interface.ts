/**
 * interface para las operaciones genéricas de los queries...
 */
export interface Parameters {
    tbl: string,
    schema: string,
    data: string | number | [] | {} | Boolean | string[],
    limit:  number
}