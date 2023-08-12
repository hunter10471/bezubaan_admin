import { create } from 'zustand';

interface UpdatePetModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useUpdatePetModal = create<UpdatePetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUpdatePetModal;
