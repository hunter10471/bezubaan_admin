'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Button from '../button/Button';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title?: string;
	body?: JSX.Element;
	footer?: JSX.Element;
	disabled?: boolean;
}

const Modal: React.FC<ModalProps> = ({
	isOpen,
	onClose,
	title,
	body,
	footer,
	disabled,
}) => {
	const [showModal, setShowModal] = useState(isOpen);
	const handleClose = useCallback(() => {
		if (disabled) {
			return;
		}
		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}
	return (
		<>
			<div className='justify-center flex overflow-x-hidden items-center overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
				<div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/6 my-6 mx-auto h-full lg:h-auto md:h-auto'>
					{/* CONTENT */}
					<div
						className={`translate duration-300 h-full ${
							showModal
								? 'translate-y-0 opacity-100'
								: 'translate-y-full opacity-0'
						}`}
					>
						<form className='translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
							{/* HEADER */}
							<div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px]'>
								<button
									onClick={onClose}
									className='p-1 border-0 hover:opacity-0 transition absolute left-9'
								>
									<IoMdClose />
								</button>
								<div className='text-lg font-semibold '>{title}</div>
							</div>
							{/* BODY */}
							<div className='relative p-6 flex-auto h-[400px] overflow-y-scroll'>
								{body}
							</div>
							{/* FOOTER */}
							<div className='flex flex-col gap-2 p-6 shadow-inner'>
								{footer}
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
