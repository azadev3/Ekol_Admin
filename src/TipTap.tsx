import React, { ChangeEvent, useRef, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";
import Paragraph from "@tiptap/extension-paragraph";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Subscript from "@tiptap/extension-subscript"
import Text from "@tiptap/extension-text";
import Blockquote from "@tiptap/extension-blockquote";
import Superscript from '@tiptap/extension-superscript'
import ImageResize from 'tiptap-extension-resize-image';
import { URL } from "./Base";
import { Extension, RawCommands } from '@tiptap/core';

type Props = {
    handleChange: (html: string) => void;
    value?: string,
};

const MyEditor: React.FC<Props> = ({ handleChange, value }) => {

    const AddNbsp = Extension.create({
        name: "addNbsp",

        addCommands(): any {
            return {
                addNbsp: () => ({ commands }: { commands: RawCommands }) => {
                    return commands.insertContent(" "); // Non-breaking space character
                },
            };
        },
    });

    const editor = useEditor({
        onUpdate: ({ editor }) => {
            const html = editor.getHTML();
            handleChange(html);
        },
        content: value || "",
        extensions: [
            StarterKit,
            TextStyle,
            Color,
            Document,
            Paragraph,
            Dropcursor,
            Image,
            Text,
            Blockquote,
            Subscript,
            Superscript,
            ImageResize,
            AddNbsp
        ],
    });

    const addImages = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";
        fileInput.multiple = true;

        fileInput.onchange = async (event) => {
            const files = (event.target as HTMLInputElement).files;

            if (files) {
                for (const file of Array.from(files)) {
                    const formData = new FormData();
                    formData.append("file", file);

                    try {
                        const response = await fetch(`${URL}/uploadForEditor`, {
                            method: "POST",
                            body: formData,
                        });

                        if (!response.ok) {
                            throw new Error("Image upload failed");
                        }

                        const data = await response.json();
                        const imageUrl = `https://ekol-server-1.onrender.com${data.data.url}`;

                        editor?.chain().focus().setImage({ src: imageUrl }).run();
                        console.log("Resim editöre eklendi:", imageUrl);
                    } catch (error) {
                        console.error("Image upload error:", error);
                    }
                }
            }
        };

        fileInput.click();
    };



    const handleButtonsClick = (e: ChangeEvent<HTMLButtonElement>) => {
        e.preventDefault();
    };

    const editorRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            editorRef?.current?.requestFullscreen();
            setIsFullScreen(true);
        } else {
            document.exitFullscreen();
            setIsFullScreen(false);
        }
    };

    React.useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "");
        }
    }, [value, editor]);

    if (!editor) {
        return null;
    }

    return (
        <div>
            <div className="control-group">
                <div className="button-group">
                    <button onClick={(e: any) => {
                        toggleFullScreen();
                        handleButtonsClick(e);
                    }}>Full Screen</button>
                    <button
                        onClick={(e: any) => {
                            e.preventDefault();
                            editor.chain().focus().addNbsp().run();
                        }}
                    >
                        Add &nbsp;
                    </button>


                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor.chain().focus().toggleSuperscript().run();
                        }}
                        className={editor.isActive('superscript') ? 'is-active' : ''}
                    >
                        Toggle superscript
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor.chain().focus().setSuperscript().run();
                        }}
                        disabled={editor.isActive('superscript')}
                    >
                        Set superscript
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor.chain().focus().unsetSuperscript().run();
                        }}
                        disabled={!editor.isActive('superscript')}
                    >
                        Unset superscript
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor.chain().focus().toggleSubscript().run()
                        }}
                        className={editor.isActive('subscript') ? 'is-active' : ''}
                    >
                        Toggle subscript
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor.chain().focus().setSubscript().run();
                        }}
                        disabled={editor.isActive('subscript')}
                    >
                        Set subscript
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor.chain().focus().unsetSubscript().run();
                        }}
                        disabled={!editor.isActive('subscript')}
                    >
                        Unset subscript
                    </button>
                    <button onClick={(e: any) => addImages(e)}>Image</button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleBold().run();
                        }}
                        disabled={!editor?.can().chain().toggleBold().run()}
                        className={editor?.isActive("bold") ? "is-active" : ""}>
                        Bold
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleItalic().run();
                        }}
                        disabled={!editor?.can().chain().toggleItalic().run()}
                        className={editor?.isActive("italic") ? "is-active" : ""}>
                        Italic
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleStrike().run();
                        }}
                        disabled={!editor?.can().chain().toggleStrike().run()}
                        className={editor?.isActive("strike") ? "is-active" : ""}>
                        Strike
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleCode().run();
                        }}
                        disabled={!editor?.can().chain().toggleCode().run()}
                        className={editor?.isActive("code") ? "is-active" : ""}>
                        Code
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().unsetAllMarks().run();
                        }}>
                        Clear marks
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().clearNodes().run();
                        }}>
                        Clear nodes
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().setParagraph().run();
                        }}
                        className={editor?.isActive("paragraph") ? "is-active" : ""}>
                        Paragraph
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleHeading({ level: 1 }).run();
                        }}
                        className={editor?.isActive("heading", { level: 1 }) ? "is-active" : ""}>
                        H1
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleHeading({ level: 2 }).run();
                        }}
                        className={editor?.isActive("heading", { level: 2 }) ? "is-active" : ""}>
                        H2
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleHeading({ level: 3 }).run();
                        }}
                        className={editor?.isActive("heading", { level: 3 }) ? "is-active" : ""}>
                        H3
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleHeading({ level: 4 }).run();
                        }}
                        className={editor?.isActive("heading", { level: 4 }) ? "is-active" : ""}>
                        H4
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleHeading({ level: 5 }).run();
                        }}
                        className={editor?.isActive("heading", { level: 5 }) ? "is-active" : ""}>
                        H5
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleHeading({ level: 6 }).run();
                        }}
                        className={editor?.isActive("heading", { level: 6 }) ? "is-active" : ""}>
                        H6
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleBulletList().run();
                        }}
                        className={editor?.isActive("bulletList") ? "is-active" : ""}>
                        Bullet list
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleOrderedList().run();
                        }}
                        className={editor?.isActive("orderedList") ? "is-active" : ""}>
                        Ordered list
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleCodeBlock().run();
                        }}
                        className={editor?.isActive("codeBlock") ? "is-active" : ""}>
                        Code block
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().toggleBlockquote().run();
                        }}
                        className={editor?.isActive("blockquote") ? "is-active" : ""}>
                        Blockquote
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().setHorizontalRule().run();
                        }}>
                        Horizontal rule
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().setHardBreak().run();
                        }}>
                        Hard break
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().undo().run();
                        }}
                        disabled={!editor?.can().chain().undo().run()}>
                        Undo
                    </button>
                    <button
                        onClick={(e: any) => {
                            handleButtonsClick(e);
                            editor?.chain().redo().run();
                        }}
                        disabled={!editor?.can().chain().redo().run()}>
                        Redo
                    </button>
                </div>
            </div>
            <div ref={editorRef} style={{ backgroundColor: "white" }}>
                <EditorContent
                    editor={editor}
                    className={`my-custom-editor ${isFullScreen ? "fulled" : ""}`}
                    acceptCharset="UTF-8"
                />
            </div>
        </div>
    );
};

export default MyEditor;
