import { create } from 'zustand';

interface ConfirmModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useConfirmModal = create<ConfirmModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useConfirmModal;
