import { Button } from '@/lib/components/atoms/Button';
import { Dialog } from '@/lib/components/templates/Dialog';

interface Props {
  isOpen: boolean;
  close: () => void;
  confirmDelete: () => void;
}

export const DeleteEvaluationDialog = ({ isOpen, close, confirmDelete }: Props) => {
  return (
    <Dialog open={isOpen} onClose={close}>
      <Dialog.Title>이 강의평을 삭제하시겠습니까?</Dialog.Title>
      <Dialog.Actions>
        <Button variant="text" size="small" onClick={close}>
          취소
        </Button>
        <Button variant="text" size="small" onClick={confirmDelete}>
          삭제
        </Button>
      </Dialog.Actions>
    </Dialog>
  );
};
