import searchService from '../services/search-service.js';

const searchByName = async (req, res, next) => {
    try {
        const { name } = req.query;
        const result = await searchService.searchByName(name);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
}

const searchByNim = async (req, res, next) => {
    try {
        const { nim } = req.query;
        const result = await searchService.searchByNim(nim);
        res.status(200).json({ data: result });
    } catch (e) {
        next(e);
    }
}

export default {
    searchByName,
    searchByNim
}