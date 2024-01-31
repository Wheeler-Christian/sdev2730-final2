import * as SQLite from "expo-sqlite";
import { Project } from "../models/project";

const database = SQLite.openDatabase("projects.db");

export function init() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS projects (
            id INTEGER PRIMARY KEY NOT NULL,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            status INTEGER NOT NULL,
            imageUri TEXT NOT NULL,
            address TEXT NOT NULL,
            lat REAL NOT NULL,
            lng REAL NOT NULL
        )`,
        [],
        () => {
          resolve();
        },
        (_, errorInit) => {
          reject(errorInit);
        }
      );
    });
  });

  return promise;
}

export function insertProject(project) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO projects (title, description, status, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          project.title,
          project.description,
          project.status,
          project.imageUri,
          project.address,
          project.location.lat,
          project.location.lng,
        ],
        (_, resultInsert) => {
          console.log(resultInsert);
          resolve(resultInsert);
        },
        (_, errorInsert) => {
          reject(errorInsert);
        }
      );
    });
  });

  return promise;
}

export function fetchProjects() {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM projects",
        [],
        (_, result) => {
          const projects = [];
          for (const dp of result.rows._array) {
            projects.push(
              new Project(
                dp.title,
                dp.description,
                dp.status,
                dp.imageUri,
                {
                  address: dp.address,
                  lat: dp.lat,
                  lng: dp.lng,
                },
                dp.id
              )
            );
          }
          resolve(projects);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}

export function fetchProjectDetails(id) {
  const promise = new Promise((resolve, reject) => {
    database.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM projects WHERE id = ?",
        [id],
        (_, result) => {
          const dbProject = result.rows._array[0];
          const project = new Project(
            dbProject.title,
            dbProject.description,
            dbProject.status,
            dbProject.imageUri,
            {
              lat: dbProject.lat,
              lng: dbProject.lng,
              address: dbProject.address,
            },
            dbProject.id
          );
          resolve(project);
        },
        (_, error) => {
          reject(error);
        }
      );
    });
  });

  return promise;
}
