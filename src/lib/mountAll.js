// Demande le montage immédiat de toutes les sections différées (voir components/Deferred)
export const MOUNT_ALL_EVENT = 'oktav:mount-all'

let requested = false

export function mountAllRequested() {
  return requested
}

export function requestMountAll() {
  requested = true
  window.dispatchEvent(new Event(MOUNT_ALL_EVENT))
}
