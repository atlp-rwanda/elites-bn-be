import { Room } from '../models';

class roomServices {
	createRoom = async (room) => {
		const createdRoom = await Room.create(room);
		return createdRoom;
	};

	getAllRoomsOfAccommodation = async (accommodationId) => {
		const rooms = await Room.findAll({ where: { accommodationId } });
		return rooms;
	};

	getSingleRoom = async (id) => {
		const foundRoom = await Room.findOne({
			where: { id },
		});
		return foundRoom;
	};

	updateRoom = async (id, roomUpdate) => {
		const updatedRoom = await Room.update(roomUpdate, {
			where: { id },
			returning: true,
			raw: true,
		});
		return updatedRoom;
	};

	deleteRoom = async (id) => {
		const deletedRoom = await Room.destroy({
			where: { id },
		});
		if (deletedRoom) {
			return 'Room deleted successfully';
		} else {
			return 'Room does not exists';
		}
	};
}

export default roomServices;
