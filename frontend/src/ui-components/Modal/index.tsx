import React, { FunctionComponent, memo, useEffect, useLayoutEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import { StyledModal, ModalBox, ButtonsContainer } from '../../styles/Modal.styled'
import { MdClose } from 'react-icons/md'

export type ModalProps = {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

const modalRoot = document.getElementById('modal-root') as HTMLDivElement

const Modal: FunctionComponent<ModalProps> = ({ children, open, onClose = () => null }) => {
  const [element] = useState<HTMLDivElement>(document.createElement('div'))
  const modal = useRef<null | HTMLDivElement>(null)

  useLayoutEffect(() => {
    if (open) {
      modalRoot.appendChild(element)
    } else if (!open && modalRoot.contains(element)) {
      modalRoot.removeChild(element)
    }
  }, [open, element])

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (modal.current && !modal.current.contains(event.target)) {
        onClose()
        modalRoot.removeChild(element)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [modal])

  return (
    <>
      {ReactDOM.createPortal(
        <StyledModal>
          <ModalBox ref={modal}>
            <ButtonsContainer>
              <MdClose onClick={onClose} />
            </ButtonsContainer>
            <>{children}</>
          </ModalBox>
        </StyledModal>,
        element
      )}
    </>
  )
}

export default memo<typeof Modal>(Modal)
