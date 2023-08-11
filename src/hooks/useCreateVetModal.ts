import { create } from 'zustand';

interface CreateVetModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useCreateVetModal = create<CreateVetModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useCreateVetModal;
