import { create } from 'zustand';

interface UpdateVetModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useUpdateVetModal = create<UpdateVetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUpdateVetModal;
