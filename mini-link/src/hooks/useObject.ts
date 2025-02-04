import React from "react";
import { useState } from "react";

interface genericObjectType {
  [key: string]: string;
}

function useObject(
  defaultVal: genericObjectType
  ): [genericObjectType, (event: React.ChangeEvent<HTMLInputElement>) => void]
{ 

  const [obj, setObj] = useState(defaultVal);

  const setObjectWrapper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value;
    const prop = event.target.name;
    const newObj = {...obj, [prop]: newVal}
    console.log(newObj);
    setObj(newObj);
  }

  return [obj, setObjectWrapper]
}

export default useObject;