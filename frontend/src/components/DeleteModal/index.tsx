import { FunctionComponent } from 'react'
import { StyledDeleteModalContent, DeleteModalButtons } from '../../styles/DeleteModal.styled'
import Button from '../../ui-components/Button'
import Modal, { ModalProps } from '../../ui-components/Modal'

export type DeleteModalProps = {
  onDelete?: () => void
} & Pick<ModalProps, 'onClose' | 'open'>

const DeleteModal: FunctionComponent<DeleteModalProps> = ({ open, onClose, onDelete }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <StyledDeleteModalContent>
        <span>{'are you sure you wanna delete it?'}</span>
        <DeleteModalButtons>
          <Button onClick={onDelete}>{'yes'}</Button>
          <Button onClick={onClose}>{'no'}</Button>
        </DeleteModalButtons>
      </StyledDeleteModalContent>
    </Modal>
  )
}
export default DeleteModal
