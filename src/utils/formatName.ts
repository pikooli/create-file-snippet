import * as path from "path";

export const formatName = ({
  fileName,
  suffix,
  prefix,
}: {
  fileName: string;
  suffix?: string;
  prefix?: string;
}) => {
  const nameSplit = fileName.split("/");
  const name = nameSplit.at(-1);
  const rest = nameSplit.slice(0, -1).join("/");
  const newName = path.join(rest, `${prefix || ""}${name}${suffix || ""}`);

  return newName;
};
