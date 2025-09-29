"use client";
import Modal from "@/components/Modal";

type Props = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmRemoveModal({ isOpen, onConfirm, onCancel }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      title="Remove from Watchlist"
      message="Are you sure you want to remove this product from your watchlist?"
      onConfirm={onConfirm}
      onCancel={onCancel}
      confirmText="Remove"
      cancelText="Cancel"
    />
  );
}
