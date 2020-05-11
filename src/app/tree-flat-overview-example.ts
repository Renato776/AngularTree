import {FlatTreeControl} from '@angular/cdk/tree';
import {Component} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FoodNode {
  name: string;
  children?: FoodNode[];
  id:number;
}

const TREE_DATA: FoodNode[] = [
  {
    name: 'Fruit',
    children: [
      {name: 'Apple',id:63},
      {name: 'Banana',id:77},
      {name: 'Fruit loops',id:2},
    ],id:45
  }, {
    name: 'Vegetables',
    children: [
      {
        name: 'Green',
        children: [
          {name: 'Broccoli',id:100},
          {name: 'Brussels sprouts',id:99},
        ],id:47
      }, {
        name: 'Orange',
        children: [
          {name: 'Pumpkins',id:43},
          {name: 'Carrots',id:5},
        ],id:65
      },
    ],id:99
  },
];

/** Flat node with expandable and level information */
interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
  id:number;
}

/**
 * @title Tree with flat nodes
 */
@Component({
  selector: 'tree-flat-overview-example',
  templateUrl: 'tree-flat-overview-example.html',
  styleUrls: ['tree-flat-overview-example.css'],
})
export class TreeFlatOverviewExample {
  private _transformer = (node: FoodNode, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      id:node.id
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
      node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(
      this._transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor() {
    this.dataSource.data = TREE_DATA;
  }
  perform(node:ExampleFlatNode){
      console.log(node.id);
    }
  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */