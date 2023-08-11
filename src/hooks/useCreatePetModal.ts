import { create } from 'zustand';

interface CreatePetModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useCreatePetModal = create<CreatePetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreatePetModal;
