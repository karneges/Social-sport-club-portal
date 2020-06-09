import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() {
  }

  addItem(key: string, value: {} | string) {
    let stringValue: string
    if (typeof value === 'object') {
      stringValue = JSON.stringify(value)
      key = `${ key }[OBJ]`
    }
    localStorage.setItem(key, stringValue)
  }

  getField(key) {
    return this.searchItemInStorage(key)
  }

  updateField(key: string, value: {} | string) {
    if (typeof value === 'string') {
      this.addItem(key, value)
    } else {
      let currentCashedObj = this.searchItemInStorage(key)
      currentCashedObj = { ...currentCashedObj, ...value }
      this.addItem(key, currentCashedObj)
    }
  }

  removeField(key: string) {
    localStorage.removeItem(`${key}[OBJ]`)
  }

  private searchItemInStorage(findKey): {} {
    const findValue: [string, string] = Object.entries(localStorage).find(([key, value]) => key.startsWith(findKey))
    if (findValue && findValue[0].endsWith('[OBJ]')) {
      return JSON.parse(findValue[1])
    }
  }
}
