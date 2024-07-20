import { Button } from 'antd';
import { ChevronDownIcon } from '@heroicons/react/solid';
import ScrollToBottom from 'react-scroll-to-bottom';

export const Home = () => {
  return (
    <ScrollToBottom className="h-full">
      {/* Contenedor principal que se desplaza hasta el final automáticamente */}
      <div className="flex flex-col text-sm md:pb-9">
        {/* Espaciador */}
        <div className="h-1.5"></div>
        {/* Contenedor del contenido principal */}
        <div className="w-full text-black" dir="auto">
          {/* Contenedor del mensaje */}
          <div className="text-base py-[18px] px-3 md:px-4 m-auto md:px-5 lg:px-1 xl:px-5">
            {/* Contenedor flexible para alinear los elementos internos */}
            <div className="mx-auto flex flex-1 gap-4 text-base md:gap-5 lg:gap-6 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem]">
              {/* Contenedor del chat */}
              <div className="relative flex w-full min-w-0 flex-col">
                {/* Contenedor de los mensajes */}
                <div className="flex-col gap-1 md:gap-3">
                  {/* Contenedor para el crecimiento flexible */}
                  <div className="flex flex-grow flex-col max-w-full">
                    {/* Contenedor de un mensaje individual */}
                    <div className="min-h-[20px] text-message flex w-full flex-col items-end gap-2 whitespace-pre-wrap break-words overflow-x-auto">
                      {/* Contenedor del mensaje con alineación */}
                      <div className="flex w-full flex-col gap-1 items-end rtl:items-start">
                        {/* Burbuja del mensaje */}
                        <div className="relative max-w-[70%] rounded-3xl bg-[#f4f4f4] px-5 py-2.5">
                          {/* Texto del mensaje */}
                          <div>Muéstrame una tabla diseñada por vos</div>
                          {/* Botón oculto que aparece al pasar el mouse */}
                          <div className="absolute bottom-0 right-full top-0 -mr-3.5 hidden pr-5 pt-1 group-hover:block">
                            <Button icon={<ChevronDownIcon className="h-5 w-5 text-gray-500" />} className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-200"></Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ScrollToBottom>
  );
};