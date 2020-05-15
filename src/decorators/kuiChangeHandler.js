import changeHandlerHelper from "./changeHandlerHelper";

export default function kuiChangeHandler(target, name, descriptor) {
  let originalMethod = descriptor.value;
  descriptor.value = changeHandlerHelper(target, originalMethod);
  return descriptor;
}
