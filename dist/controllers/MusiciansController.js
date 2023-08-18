"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MusicianModel_1 = __importDefault(require("../model/MusicianModel"));
const logger_1 = __importDefault(require("../logger"));
class MusiciansController {
    /**
     * Get all favourite musicians.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getAllFavouriteMusicians(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const favouriteMusicians = yield MusicianModel_1.default.find().lean();
                if (favouriteMusicians.length === 0) {
                    logger_1.default.info('Favourite musicians not found');
                    res.status(404).json({ message: 'No favourite musicians found' });
                }
                else {
                    res.json(favouriteMusicians);
                    logger_1.default.info('Favourite musicians found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getAllFavouriteMusicians method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Get a favourite musician by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    getFavouriteMusicianByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const favouriteMusician = yield MusicianModel_1.default.findById(id).lean();
                if (!favouriteMusician) {
                    res.status(404).json({ message: 'Musician not found' });
                }
                else {
                    res.json(favouriteMusician);
                    logger_1.default.info('Favourite musician found');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in getFavouriteMusicianByID method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Add a new musician.
     *
     * @param req The request object.
     * @param res The response object.
     */
    addFavouriteMusician(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, genres, instruments, labels, born, yearsActive, spouses, children, relatives, notableWorks, imageURL } = req.body;
            try {
                const newFavouriteMusician = new MusicianModel_1.default({
                    fullName,
                    genres,
                    instruments,
                    labels,
                    born,
                    yearsActive,
                    spouses,
                    children,
                    relatives,
                    notableWorks,
                    imageURL,
                });
                yield newFavouriteMusician.save();
                res.status(201).json(newFavouriteMusician);
                logger_1.default.info('Favourite musician added');
            }
            catch (error) {
                logger_1.default.error(`Error found in addFavouriteMusician method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Update an existing favourite musician by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    updateFavouriteMusician(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const updatedData = req.body;
            try {
                const updatedFavouriteMusician = yield MusicianModel_1.default.findByIdAndUpdate(id, updatedData, { new: true }).lean();
                if (!updatedFavouriteMusician) {
                    res.status(404).json({ message: 'Musician not found' });
                }
                else {
                    res.json(updatedFavouriteMusician);
                    logger_1.default.info('Favourite musician updated');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in updateFavouriteMusician method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
    /**
     * Delete an existing favourite musician by ID.
     *
     * @param req The request object.
     * @param res The response object.
     */
    deleteFavouriteMusician(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deletedFavouriteMusician = yield MusicianModel_1.default.findByIdAndDelete(id).lean();
                if (!deletedFavouriteMusician) {
                    res.status(404).json({ message: 'Musician not found' });
                }
                else {
                    res.json({ message: 'Favourite musician deleted successfully' });
                    logger_1.default.info('Favourite musician deleted');
                }
            }
            catch (error) {
                logger_1.default.error(`Error found in deleteFavouriteMusician method: ${error}`);
                res.status(500).json({ error: 'Internal server error' });
            }
        });
    }
}
exports.default = MusiciansController;
