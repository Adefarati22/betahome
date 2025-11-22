import { RiCloseLine } from "@remixicon/react";

export default function Modal({
  id,
  title,
  children,
  isOpen,
  onClose,
  classname,
  showClose = false,
}) {
  return (
    <dialog id={id} className={`modal modal-middle z-100 h-screen ${isOpen ? "modal-open" : ""}`}>
      <div className={`modal-box ${classname}`}>
        {showClose && (
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 z-30"
            type="button"
            onClick={onClose}
          >
            <RiCloseLine />
          </button>
        )}
        <h1 className="font-bold text-lg">{title}</h1>
        {children}
      </div>
      <div className="modal-backdrop bg-black/60 h-screen" onClick={onClose} />
    </dialog>
  );
}