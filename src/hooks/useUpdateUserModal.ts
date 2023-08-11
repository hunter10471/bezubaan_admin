import { create } from 'zustand';

interface UpdateUserModalStore {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
}

const useUpdateUserModal = create<UpdateUserModalStore>((set) => ({
	isOpen: false,
	onOpen: () => set({ isOpen: true }),
	onClose: () => set({ isOpen: false }),
}));

export default useUpdateUserModal;
