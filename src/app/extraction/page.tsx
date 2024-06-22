import { AppContainer } from "../layout";

export default function () {
  return (
    <AppContainer>
      <div>
        <div>Página para los centros de extracción</div>
        <ul className="list-disc list-inside">
          <li>Ver historial de extracciones</li>
          <li>Realizar nueva extracción</li>
          <li>Ver lista de laboratorios</li>
          <li>Transferir a laboratorio</li>
        </ul>
      </div>
    </AppContainer>
  );
}
