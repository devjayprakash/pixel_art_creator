'use client';

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import Image from 'next/image';
import { useState } from 'react';
import { savePostToDb } from './actions';

interface SharePixelArtProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  base64: string;
}

const SharePixelArt: React.FC<SharePixelArtProps> = ({
  isOpen,
  onClose,
  base64,
}) => {
  const [title, setTitle] = useState('');

  return (
    <div>
      {/* our post new pixel art modal */}
      <Modal size={'2xl'} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="text-black">
          <ModalHeader className="flex flex-col gap-1">
            Share your pixel art
          </ModalHeader>
          <ModalBody>
            <Input
              onChange={(ev) => setTitle(ev.target.value)}
              value={title}
              placeholder="Write something about your pixel art ..."
            />
            <div className="border-[0.5px] border-gray-600 rounded-md flex justify-center">
              <Image
                width={400}
                height={400}
                src={base64}
                alt="base 64 preview"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onPress={() => {
                savePostToDb(base64, title);
                onClose();
              }}
            >
              Share it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SharePixelArt;
