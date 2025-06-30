import DeleteButton from "../Button/DeleteButton";
import "./Table.css";

export default function TableOrder({ data, headers, onDelete }) {
  if (!data || data.length === 0) {
    return (
      <table>
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header.key}>{header.label}</th>
            ))}
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {headers.map((header) => (
              <td key={header.key}>--</td>
            ))}
            <td>--</td>
          </tr>
        </tbody>
      </table>
    );
  }

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header.key}>{header.label}</th>
          ))}
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => {
          const isDelivered = row.status === "DELIVERED";

          return (
            <tr key={index}>
              {headers.map((header, cellIndex) => (
                <td key={cellIndex}>{row[header.key]}</td>
              ))}
              <td className="button">
                <DeleteButton
                  handleClick={() => {
                    console.log("Deleted order with ID:", row.id);
                    onDelete(row.id);
                  }}
                  text={"Eliminar"}
                  disabled={isDelivered} // disable if delivered
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
