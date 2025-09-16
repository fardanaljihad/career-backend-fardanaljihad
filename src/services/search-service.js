import axios from 'axios';

const getAllData = async () => {
    const url = 'https://ogienurdiana.com/career/ecc694ce4e7f6e45a5a7912cde9fe131';
    const response = await axios.get(url);
    const rawData = response.data.DATA;

    const rows = rawData.split('\n');
    const headers = rows[0].split('|');

    const result = rows.slice(1).map(row => {
        const columns = row.split('|');
        const obj = {};

        headers.forEach((header, index) => {
            obj[header] = columns[index];
        });

        return obj;
    });

    return result;
};

const searchByName = async (name) => {
    const data = await getAllData();
    return data.filter(item =>
        item.NAMA === name
    );
};

const searchByNim = async (nim) => {
    const data = await getAllData();
    return data.filter(item =>
        item.NIM === nim
    );
}

const searchByYmd = async (ymd) => {
    const data = await getAllData();
    return data.filter(item =>
        item.YMD === ymd
    );
}

export default {
    searchByName,
    searchByNim,
    searchByYmd
}
