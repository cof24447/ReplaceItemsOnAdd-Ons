/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import addOnSandboxSdk from "add-on-sdk-document-sandbox";
import { editor, colorUtils, constants } from "express-document-sdk";

const { runtime } = addOnSandboxSdk.instance;
let flag = false;
async function start() {
    const sandboxApi = {
        addPage: function (size = { width: 400, height: 600 }) {
            editor.documentRoot.pages.addPage(size);
        },
        clearArtboard: function () {
            const insertionParent = editor.context.insertionParent;
            if (insertionParent.children.length > 0) {
                insertionParent.children.clear();
            }
            return "**** Artboard cleared successfully ****";
        },
        createShapes: function() {
            const insertionParent = editor.context.insertionParent;

            const rectangle = editor.createRectangle();
            rectangle.width = 200;
            rectangle.height = 150;
            rectangle.translation = { x: 100, y: 20 };

            const ellipse = editor.createEllipse();
            ellipse.rx = 150;
            ellipse.ry = 70;
            ellipse.translation = { x: 10, y: 200 };

            const text = editor.createText();
            text.text = "A Text Node";
            text.translation = { x: 20, y: 400 };
            text.textAlignment = constants.TextAlignment.right;

            const rectFill = editor.makeColorFill(colorUtils.fromRGB(Math.random(), Math.random(), Math.random(), Math.random()));
            const ellipseFill = editor.makeColorFill(colorUtils.fromRGB(Math.random(), Math.random(), Math.random(), Math.random()));
            rectangle.fill = rectFill;
            ellipse.fill = ellipseFill;
            insertionParent.children.append(rectangle);
            insertionParent.children.append(ellipse);
            insertionParent.children.append(text);

            return "**** Shapes created successfully ****";
        },
        createText: function(Text,x,y) {
            const insertionParent = editor.context.insertionParent;
            // if(flag !== false){
            //     flag = false;
            //     //insertionParent.clear()
            // }
            console.log("starting length = ",insertionParent.children.length)
            //console.log("converting in Array= ",insertionParent.children.toArray())
            let childrens =  insertionParent.children.toArray();
            console.log("All==",childrens);

            childrens.map((item)=>{
                console.log(item.type)
                console.log(item.type)
                if(item.type === "Text"){
                    item.text = "Name:Santosh  Kumar Pandey"
                } else if(item.type === "MediaContainer"){
                    //item.append();
                }
            })
            
            if (insertionParent.children.length > 0) {
                //insertionParent.children.clear();
                // insertionParent.children.first.removeFromParent()
                // insertionParent.children.last.removeFromParent()
                insertionParent.children.last.opacity = 0.8;
                //console.log("after removing last child , length = ",insertionParent.children.length)
                //console.log("parent data",)
                //console.log("parent main",insertionParent)
                //console.log("parent main children",insertionParent.children)
                insertionParent.children.remove(insertionParent.children.last);
                //editor.context.selection[0].text = text
                return
            }
            console.log("after if")
            //flag = true;
            const text = editor.createText();
            
            text.text = Text;
            text.translation = { x: x, y: y };
            text.textAlignment = constants.TextAlignment.right;
            //insertionParent.children.append(text);
            insertionParent.children.append(text);
            console.log("data added")
            console.log("after adding  data again , length = ",insertionParent.children.length)
            return "**** Text created successfully ****";
        },
        createImage: async function(blob,Name, size = {}) {
            let name = Name 
            const insertionParent = editor.context.insertionParent;
            //insertionParent.children.clear();
            // if(flag !== false){
            //     flag = false;
            //     insertionParent.clear()
            // }

            console.log(insertionParent.children.length)
            // if (insertionParent.children.length > 0) {
            //     insertionParent.children.clear();
            // }

            const text = editor.createText();
            
            text.text = Name;
            text.translation = { x: 140, y:230 };
            text.textAlignment = constants.TextAlignment.right;
            const bitmapImage = await editor.loadBitmapImage(blob);
            let childrens =  insertionParent.children.toArray();
            console.log("All==",childrens, Name);
            await editor.queueAsyncEdit(() => {
                // let { width, height } = size;
                // if (!width || !height) {
                //     width = bitmapImage.width;
                //     height = bitmapImage.height;

                // }
                //const mediaContainerNode = editor.createImageContainer(bitmapImage, { initialSize: { 300, 300 } });
                const mediaContainerNode = editor.createImageContainer(bitmapImage);
                //insertionParent.children.append(text);
                childrens.map((item)=>{
                    console.log(item.type)
                    console.log("item data",item.text)
                    // if(item.type === "MediaContainer"){
                       
                    //     item.parent.children.append(mediaContainerNode)
                    //     item.removeFromParent();
                    // } else 
                    if(item.type === "Group"){
                        let data = item.children.toArray();
                        data.map((item)=>{
                            console.log(data)
                            console.log("chi===>",item.text,Name)
                            if(item.type === "Text" && item.text === "Aziz Hussain"){
                                item.text = Name
                            }
                        })
                        
                    }
                })
                
                //insertionParent.children.append(mediaContainerNode);
            });
           
            return "**** Image created successfully ****"
        }
    }

    // Expose `sandboxApi` to the UI runtime.
    runtime.exposeApi(sandboxApi);
}

start();
