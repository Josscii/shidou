import { FunctionComponent, useState } from "react";
import Data from "./Data";
import Header from "./Header";
import Help from "./Help";
import { Main } from "./Main";
import Modal from "./Model";

enum ModalType {
  help,
  data,
}

const App: FunctionComponent = () => {
  const [modalType, setModalType] = useState<ModalType>();
  return (
    <div className="max-w-md mx-auto min-h-full flex flex-col">
      {modalType === ModalType.help && (
        <Modal>
          <Help onClose={() => setModalType(undefined)} />
        </Modal>
      )}
      {modalType === ModalType.data && (
        <Modal>
          <Data onClose={() => setModalType(undefined)} />
        </Modal>
      )}
      <Header
        onHelp={() => setModalType(ModalType.help)}
        onData={() => setModalType(ModalType.data)}
      />
      <Main />
    </div>
  );
};

export default App;
