import request from "./request";

/*

data:
created: "2020-10-03T09:41:19.769810Z"
file: null
fio: ""
id: 4
reason: ""
status: "new"
text: "Я вчера гулял с собакой, но она обосралась и я её убил"
 */

export const createAppeal = async (reason: string, fio: string, text: string): Promise<{ success: boolean, error: string | null, id: string | number }> => {
    const data = {reason, fio, text}

    try {
        const response = await request('api/v1/appeals/').post(data);
        const {id} = response.data;
        return {success: true, error: null, id: id}
    } catch (e) {
        const error = 'Произошла ошибка, проверьте правильность заполнения полей';
        return {success: false, error, id: null}
    }
};

export const getAppealsList = async () : Promise<{created: Date, file: string, fio: string, id: number | string, reason: string, status: string, text: string}[]> => {
    try {
        const response = await request('api/v1/appeals/').get();
        console.log(response);
        return response.data
    } catch (e) {
        console.log(e)
    }
};

export const getAppealById = async () => {

};