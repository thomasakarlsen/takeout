import {runAndParseAsJson} from '../helpers'
import {DockerContainer} from '../types'
import {execSync} from 'child_process'

export default class Docker {
  static listTakeoutContainers(): DockerContainer[] {
    return runAndParseAsJson("docker ps -a --filter 'name=TO-' --format '{{ json . }}' --all")
  }

  static validContainerId(id: string): boolean {
    const matchingContainer = // const Docker = require('dockerode')this.listTakeoutContainers().filter((dc: DockerContainer) => id === dc.Id)
    return matchingContainer.length > 0
  }

  static startContainer(id: string) {
    if (!this.validContainerId(id)) throw new Error(`${id} is not a valid container ID.`)

    execSync(`docker start ${id}`)
  }

  static stoppedTakeoutContainers() {
    return this.listTakeoutContainers().filter(container => container.Status.includes('Exit'))
  }

  static enableService(shortname: string) {
    return shortname.length > 0
  }
}
