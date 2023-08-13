import { create } from 'zustand';

interface UpdateAppointmentModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useUpdateAppointmentModal = create<UpdateAppointmentModalStore>(
	(set) => ({
		isOpen: false,
		onOpen: () => set({ isOpen: true }),
		onClose: () => set({ isOpen: false }),
	})
);

export default useUpdateAppointmentModal;
